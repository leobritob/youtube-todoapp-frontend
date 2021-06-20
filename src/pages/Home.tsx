import { useState } from 'react';
import { Input, Text, Button, Row, Column, List } from 'components';

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);

  const handleOKButton = () => {
    if (!taskName) return;

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });
    setTaskName('');
  };

  return (
    <Column width="600px" margin="0 auto">
      <Text fontWeight="bold" fontSize="bodyLarge" my="10px" pl="10px">
        Tasks
      </Text>
      <Row width="100%">
        <Input
          flex={1}
          placeholder="Enter a task name here..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button onClick={handleOKButton}>OK</Button>
      </Row>

      <List items={tasks} />
    </Column>
  );
};
