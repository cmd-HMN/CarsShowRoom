import React from 'react';
import {  Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingScreen: React.FC = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        zIndex: 9999, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <VStack spacing={4}>
        <Spinner size="xl" color="white" />
        <Text color="white">Loading...</Text>
      </VStack>
    </div>
  );
};

export default LoadingScreen;