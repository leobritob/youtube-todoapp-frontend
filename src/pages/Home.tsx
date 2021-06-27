import { useState } from 'react';
import { Input, Text, Button, Row, Column, List, Logo, Icon } from 'components';

const SECONDS_DEFAULT = 10;

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);
  const [seconds, setSeconds] = useState(SECONDS_DEFAULT);

  const handleOKButton = () => {
    if (!taskName) return;

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });
    setTaskName('');
  };

  const startTimer = () => {
    setInterval(() => {
      setSeconds((previousSeconds) => {
        return previousSeconds - 1;
      });
    }, 1000);
  };

  return (
    <Column width="600px" margin="0 auto">
      <Column width="100%" py="25px" alignItems="center">
        <Logo />
      </Column>

      <Column
        width="100%"
        minHeight="300px"
        p="20px"
        bg="rgba(255, 255, 255, 0.2)"
        borderRadius="4px"
        alignItems="center"
      >
        <Text fontFamily="secondary" fontSize="bodyExtraLarge">
          Ready
        </Text>

        <Text fontFamily="secondary" fontWeight="bold" fontSize="displayExtraLarge" py="30px">
          25:00
        </Text>

        <Button variant="primary" onClick={startTimer}>
          <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary">
            START
          </Text>
        </Button>

        <Row py="20px">
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="play" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="pause" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="stop" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="restart" />
          </Button>
          <Button variant="primary" p="10px 20px" mx="5px">
            <Icon variant="done" />
          </Button>
        </Row>
      </Column>

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
