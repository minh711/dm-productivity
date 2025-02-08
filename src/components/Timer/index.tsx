import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

const Timer = ({ duration = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100); // Start full, decrease over time
  const [isTimerActive, setIsTimerActive] = useState(false);

  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          setIsTimerActive(true);
        } else {
          alert('Notification permission denied');
        }
      });
    } else {
      setIsTimerActive(true);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && isTimerActive) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        setProgress(((timeLeft - 1) / duration) * 100); // Update progress
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isTimerActive) {
      // Show notification when the timer is up
      if (Notification.permission === 'granted') {
        new Notification('Time is up!');
      }
    }
  }, [timeLeft, duration, isTimerActive]);

  const data = [{ name: 'Burn', value: progress }]; // Chart updates every second

  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <RadialBarChart
        width={200}
        height={200}
        cx="50%"
        cy="50%"
        innerRadius="50%"
        outerRadius="100%"
        barSize={10}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar
          dataKey="value"
          fill="red"
          background={{ fill: '#eee' }}
          cornerRadius={10}
        />
      </RadialBarChart>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '32px',
          fontWeight: 'bold',
        }}
      >
        {timeLeft}
      </div>

      {!isTimerActive && (
        <Button
          onClick={requestNotificationPermission}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            fontSize: '16px',
          }}
        >
          Start Timer
        </Button>
      )}
    </div>
  );
};

export default Timer;
