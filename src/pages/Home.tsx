import { useState, Fragment } from 'react';
import { Input, Text, Button, Row, Column, List, Logo, Icon } from 'components';
import { useMemo } from 'react';
import { useCallback } from 'react';

const SECONDS_DEFAULT = 5;

export const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<{ label: string }[]>([]);
  const [seconds, setSeconds] = useState(SECONDS_DEFAULT);
  const [timer, setTimer] = useState<any>();
  const [stage, setStage] = useState('ready');

  const handleOKButton = () => {
    if (!taskName) return;

    setTasks((previous) => {
      const copy = [...previous];
      copy.push({ label: taskName });
      return copy;
    });
    setTaskName('');
  };

  const secondsToTime = (secs: number) => {
    const divisorMinutes = secs % 3600;
    let minutes: any = Math.floor(divisorMinutes / 60);
    minutes = String(minutes).padStart(2, '0');

    const divisorSeconds = divisorMinutes % 60;
    let seconds: any = Math.ceil(divisorSeconds);
    seconds = String(seconds).padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    setStage('in_progress');

    const timerInterval = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds === 0) {
          clearInterval(timerInterval);
          setTimer(undefined);
          setStage('finished');
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    setTimer(timerInterval);
  };

  const handleRestartButton = useCallback(() => {
    setStage('ready');
    setSeconds(SECONDS_DEFAULT);
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handlePauseButton = useCallback(() => {
    clearInterval(timer);
    setTimer(undefined);
  }, [timer]);

  const handleStopButton = useCallback(() => {
    handlePauseButton();
    setSeconds(SECONDS_DEFAULT);
    setStage('ready');
  }, [handlePauseButton]);

  const handleStageStatus = useMemo(() => {
    switch (stage) {
      case 'ready':
        return 'Ready';

      case 'in_progress':
        return 'Time to work!';

      case 'finished':
        return 'Finished';

      default:
        return 'Ready';
    }
  }, [stage]);

  const handleStageButtons = useMemo(() => {
    switch (stage) {
      case 'ready':
        return (
          <Fragment>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary">
                START
              </Text>
            </Button>
          </Fragment>
        );

      case 'in_progress':
        return (
          <Fragment>
            <Row py="20px">
              <Button variant="primary" p="10px 20px" mx="5px" onClick={startTimer}>
                <Icon variant="play" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handlePauseButton}>
                <Icon variant="pause" />
              </Button>
              <Button variant="primary" p="10px 20px" mx="5px" onClick={handleStopButton}>
                <Icon variant="stop" />
              </Button>
            </Row>
          </Fragment>
        );

      case 'finished':
        return (
          <Row py="20px">
            <Button variant="primary" p="10px 20px" mx="5px" onClick={handleRestartButton}>
              <Icon variant="restart" />
            </Button>
            <Button variant="primary" p="10px 20px" mx="5px">
              <Icon variant="done" />
            </Button>
          </Row>
        );

      default:
        return (
          <Fragment>
            <Button variant="primary" onClick={startTimer}>
              <Text fontFamily="secondary" fontSize="bodyExtraLarge" fontWeight="bold" color="primary">
                START
              </Text>
            </Button>
          </Fragment>
        );
    }
  }, [handlePauseButton, handleStopButton, handleRestartButton, stage]);

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
          {handleStageStatus}
        </Text>

        <Text fontFamily="secondary" fontWeight="bold" fontSize="displayExtraLarge" py="30px">
          {secondsToTime(seconds)}
        </Text>

        {handleStageButtons}
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
