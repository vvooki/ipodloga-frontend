import React, { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getProject } from '../redux/thunks/projectThunk';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';
import { formatFileName } from '../functions/functions';
import { addFile, getFilesForProject } from '../redux/thunks/fileThunk';

const Files = () => {
  const location = useLocation();
  const projectId = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);

  const project = useAppSelector((state) => state.project.project);
  const files = useAppSelector((state) => state.file.files);

  const dispatch = useAppDispatch();

  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = async () => {
    try {
      setIsLoading(true);
      let file_url = '';
      if (file !== null) {
        console.log('wchodze');
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file?.type)) {
          toast.error(
            'Nieobsługiwany format pliku. Tylko pliki .jpeg, .png i .gif są obsługiwane',
          );
          return;
        }

        const MAX_FILE_SIZE = 5120; // 5MB
        const fileSizeKiloBytes = file.size / 1024;
        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
          toast.error('Plik jest zbyt duży (max: 5MB)');
          return;
        }

        let file_id = new Date().valueOf();
        const imageName = formatFileName(file.name);
        const imageRef = ref(storage, `files/${file_id + imageName}`);

        const snapshot = await uploadBytes(imageRef, file);
        file_url = await getDownloadURL(snapshot.ref);

        console.log(projectId);

        dispatch(
          addFile({
            projectId: project.id,
            fileUrl: file_url,
            token: currentUser.accessToken,
          }),
        );
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  useEffect(() => {
    if (project) return;
    dispatch(getProject({ id: projectId, token: currentUser.accessToken }));
  }, [project, dispatch, projectId, currentUser.accessToken]);

  useEffect(() => {
    if (isLoading) {
      toast.loading('Uploading file');
    } else {
      toast.remove();
    }
  }, [isLoading]);

  useEffect(() => {
    if (file) handleUploadFile();
  }, [file]);

  useEffect(() => {
    dispatch(getFilesForProject({ projectId, token: currentUser.accessToken }));
  }, []);

  if (project)
    return (
      <div>
        <div className="top-container">
          <h2>{project.name} files</h2>
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            name="file"
            id="file"
            required
            hidden
          />
          <label
            htmlFor="file"
            className="p-2 border bg-slate-700 text-white rounded-lg cursor-pointer hover:text-slate-200 transition-all"
          >
            Upload file
          </label>
        </div>
        <div>
          {files.map((file) => {
            return <div>{file.id}</div>;
          })}
        </div>
      </div>
    );
};

export default Files;
