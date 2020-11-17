import React, { useEffect, useRef} from 'react';
import '../css/index.css';
import {Link } from 'react-router-dom';

function Header(props) {
  const ref = useRef([10]);

  useEffect(
    () => {
      if (props.data === null){
        ref.current.forEach(el => el.setAttribute("disabled", true));
      } 
      props.refs(ref.current);

    }, [props.data, props]);


  /////////////////////////////// onClickHandle function /////////////////////////////////////////////////////////
  const onClickHandle = (e) => {
    document.querySelectorAll('[role="tab"]').forEach(tab => {
      tab.setAttribute('aria-selected', false);
    });
    for(let i=0; i<10;i++){
      ref.current[i].className = '';
    }
    e.target.parentElement.setAttribute('aria-selected', true);
  }


  return (
    <>
      <Link to="/" role="tab" aria-selected="true" onClick={onClickHandle} > <button id="home">Home</button></Link>
      <Link to="/sun" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[0] = el} id="sun">Sun</button></Link>
      <Link to="/mercury" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[2] = el} id="mercury">Mercury</button></Link>
      <Link to="/venus" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[3] = el} id="venus">Venus</button></Link>
      <Link to="/moon" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[1] = el} id="moon">Moon</button></Link>
      <Link to="/mars" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[4] = el} id="mars">Mars</button></Link>
      <Link to="/jupiter" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[5] = el} id="jupiter">Jupiter</button></Link>
      <Link to="/saturn" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[6] = el} id="saturn">Saturn</button></Link>
      <Link to="/uranus" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[7] = el} id="uranus">Uranus</button></Link>
      <Link to="/neptune" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[8] = el} id="neptune">Neptune</button></Link>
      <Link to="/pluto" role="tab" aria-selected="false" onClick={onClickHandle}> <button ref={el => ref.current[9] = el} id="pluto">Pluto</button></Link>
    </>
  );
}

export default Header;
