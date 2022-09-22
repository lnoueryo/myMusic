import React, { useLayoutEffect, useState } from 'react';
import { changeWindowSize, countUp } from '../../store/modules';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
export default function Config() {
  useWindowSize()
}

const useWindowSize = () => {
  const dispatch = useDispatch()
  useLayoutEffect(() => {

    const updateSize = () => {
      dispatch(changeWindowSize({x: window.innerWidth, y: window.innerHeight}))
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
};
