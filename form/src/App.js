import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
            {/* <!-- dau --> */}
            <div className="row">
                <div className="wrap">
                    <div className="col-12">
                        <h1>Đăng ký thành viên</h1>
                    </div>
                </div>

            </div>

            {/* <!-- than --> */}
            <div className="row">
                <div className="wrap">
                    <form action="">
                        <div className="col-4">
                            <div className="left">
                                <div>
                                    <h3>Nội dung</h3>
                                </div>
                                <div>
                                    <p>Họ và tên:</p>
                                </div>
                                <div>
                                    <p>Email:</p>
                                </div>
                                <div>
                                    <p>Mật khẩu:</p>
                                </div>
                                <div>
                                    <p>Avatar:</p>
                                </div>
                                <div>
                                    <p>Số điện thoại:</p>
                                </div>
                                <div>
                                    <p>Tuổi:</p>
                                </div>
                                <div className="gender">
                                    <p>Giới tính:</p>
                                </div>
                                <div>
                                    <p className="hobbi">Sở thích:</p>
                                </div>
                                <div>
                                    <p className="note">Ghi chú:</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="right">
                                <div>
                                    <h3>Giá trị</h3>
                                </div>
                                <div>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <input type="text"/>
                                </div>
                                <div>
                                    <input type="text"/>
                                </div>
                                <div className="file">
                                    <input type="file"></input>
                                </div>
                                <div>
                                    <input type="text"/>
                                </div>
                                <div className="age">
                                    <input type="number" min="1" max="100" value="1"></input>
                                </div>
                                <div className="gender">
                                    <input type="radio">Nam</input><br/>
                                    <input type="radio" checked>Nữ</input>
                                </div>
                                <div className="hobbi">
                                    <input type="checkbox">Bóng đá</input><br/>
                                    <input type="checkbox">Cầu lông</input><br/>
                                    <input type="checkbox">đua thuyền</input>
                                </div>
                                <div className="note">
                                    <textarea name="message"  rows="4">Buổi học đầu tiên về HTML</textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
            {/* <!-- cuoi --> */}
            <div className="row">
                <div className="button">
                    <button>Đăng ký</button>
                </div>
            </div>
      </div>

    );
  }

}

export default App;
