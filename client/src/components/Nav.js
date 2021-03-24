import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../store/appSlice';
import {UserOutlined} from '@ant-design/icons';
import Identicon from 'identicon.js';

const Nav = () => {
  const dispatch = useDispatch();
  const dataProfil = useSelector(state => state.app.user);
  const fullName = dataProfil.name + ', ' + dataProfil.lastname;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const container = {
    backgroundColor: 'black',
  };
  const logo = {
    color: 'white',
    fontSize: '5vw',

    weight: '100vw',
    height: '20vh',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const profil = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '1vh',
    color: 'white',
    cursor: "pointer"
  };


  return (
    <div style={container}>
      <div style={logo}>
        QuizCoin
      </div>-
      <div onClick={showModal} style={profil}>
        <UserOutlined style={{fontSize: '8vh', color: 'white'}}/>
        {dataProfil.name}
        {
          console.log(this)
          /*this.props.account
          ? <img
            width='30'
            height='30'
            alt="identicon"
            src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
          />
          : <span></span>
        */}
      </div>


      <Modal
        visible={isModalVisible}
        title={fullName}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
    Retour
          </Button>,
        ]}
      >
        <p>Prénom: {dataProfil.name}</p>
        <p>Nom: {dataProfil.lastname}</p>
        <p>Email: {dataProfil.email}</p>
        <a title="Logout" onClick={() => dispatch(logoutUser())}>Se déconnecter</a>
      </Modal>

    </div>


  )
    ;


};


export default Nav;
