import React, { useContext, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from '../components/TaskCard';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { getStudentTasks, updateTask } from '../redux/thunks/taskThunk';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
  const { currentUser } = useContext(AuthContext);

  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(
      getStudentTasks({
        studentId: currentUser.id,
        token: currentUser.accessToken,
      }),
    );
  }, [currentUser.accessToken, currentUser.id, dispatch]);

  const toDo = tasks.filter((task) => task.task_status === 'TO-DO');
  const inProgress = tasks.filter((task) => task.task_status === 'IN-PROGRESS');
  const done = tasks.filter((task) => task.task_status === 'DONE');

  const [columns, setColumns] = useState({});

  // Update columns state when tasks data changes
  useEffect(() => {
    setColumns({
      [uuidv4()]: {
        title: 'TO-DO',
        items: toDo,
      },
      [uuidv4()]: {
        title: 'IN-PROGRESS',
        items: inProgress,
      },
      [uuidv4()]: {
        title: 'DONE',
        items: done,
      },
    });
  }, [tasks]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
      console.log(removed, destColumn.title);
      dispatch(
        updateTask({
          task: {
            ...removed,
            task_status: destColumn.title,
          },
          token: currentUser.accessToken,
        }),
      );
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <TaskCard key={index} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
