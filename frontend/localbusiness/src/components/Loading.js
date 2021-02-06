import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({color, height, width}) => (
	<ReactLoading type={'bars'} color={'#ef4136'} height={50} width={70} />
);
  
export default Loading;