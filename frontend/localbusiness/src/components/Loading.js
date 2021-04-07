import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({color, height, width}) => (
	<ReactLoading type={'bars'} color={'#ef4136'} height={30} width={50} />
);
  
export default Loading;