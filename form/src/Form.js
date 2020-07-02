import React, { Component } from 'react'

const subject = [
  "Đá bóng",
  "Cầu lông",
  "Đua thuyền"
];

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtname:"",
      txtemail:"",
      txtpass:"",
      txtavatar:"",
      txtphone:"",
      txtage:1,
      txtgender:"male",
      txtnote:"Buổi học đầu tiên về HTML",
      txthobbi: new Set()
    };
    this.handleChange =this.handleChange.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    var nhobbi = "";
    for(const hb of this.state.txthobbi){
      nhobbi =+ hb +",";
    }

    var content = "";
    content += "họ tên:" + this.state.txtname;
    content += "tuổi:" + this.state.txtage;
    content += "email:" + this.state.txtemail;
    content += "giới tính:" + this.state.txtgender;
    content += "mật khẩu:" + this.state.txtpass;
    content += "sđt:" + this.state.txtphone;
    content += "ghi chú:" + this.state.txtnote;
    content += "sở thích:" + nhobbi;

    console.log(this.state);
  }

  handleCheckBox = () => {
    const hobbi = subject.map((value,key) => {
      return <label className="hobbi" key ={key}><input
      type="checkbox"
      name="txthobbi"
      value={value}
      onChange= {() => this.checkedSubject(value)}
      checked = {this.state.txthobbi.has(value)}
    />{value}</label>
    });
    return hobbi
  }
  componentWillMount() {
    this.checkedCheckBox = new Set();
  }

  checkedSubject = (hobbi) => {
    if(this.checkedCheckBox.has(hobbi)){
      this.checkedCheckBox.delete(hobbi);
    } else {
      this.checkedCheckBox.add(hobbi);
    }

    this.setState({
      txthobbi: this.checkedCheckBox
    })
    console.log(this.state.txthobbi)
  }

  handleFile = (event) => {
    console.log(event.target.files[0].name)
    this.setState({
      txtavatar: event.target.files[0].name
    });
  }


  render() {
    return (
      <>
        <div className="container">
          <div className="banner">
            <h1>Đăng ký thành viên</h1>
          </div>
          <form class="form-horizontal" onSubmit={this.handleSubmit}>
            <table className="table" >
            <tr className="header">
                <th>Nội dung</th>
                <th>
                  Giá trị
                </th>
              </tr>
              <tr className="name">
                <td>Họ và tên:</td>
                <td>
                  <input type="text"
                  name="txtname"
                  onChange={this.handleChange}
                  value={this.state.txtname} ></input>
                </td>
              </tr>
              <tr className="email">
                <td>Email:</td>
                <td>
                  <input type="text"
                  name="txtemail"
                  onChange={this.handleChange}
                  value={this.state.txtemail}></input>
                </td>
              </tr>
              <tr className="pass">
                <td>Mật khẩu:</td>
                <td>
                  <input
                  type="password"
                  name="txtpass"
                  onChange={this.handleChange}
                  value={this.state.txtpass}
                  ></input>
                </td>
              </tr>
              <tr className="avatar">
                <td>Avatar:</td>
                <td>
                  <input
                  type="file"
                  name="txtavatar"
                  onChange={this.handleFile}
                  ></input>
                </td>
              </tr>
              <tr className="phone">
                <td>Số điện thoại:</td>
                <td>
                  <input
                  type="number"
                  name="txtphone"
                  onChange={this.handleChange}
                  value={this.state.txtphone}
                  ></input>
                </td>
              </tr>
              <tr className="age">
                <td>Tuổi:</td>
                <td>
                  <select
                  name="txtage"
                  onChange={this.handleChange}
                  value={this.state.txtage}>
                    <option value="1">1 tuổi</option>
                    <option value="2">2 tuổi</option>
                    <option value="3">3 tuổi</option>
                    <option value="4">4 tuổi</option>
                  </select>
                </td>
              </tr>
              <tr className="gender">
                <td>Giới tính:</td>
                <td>
                  <input type="radio"
                  name="txtgender"
                  onChange={this.handleChange}
                  defaultValue="male"
                  checked={this.state.txtgender === "male"}
                  />
                  <label htmlFor="male">Nam</label>
                  <input type="radio"
                  name="txtgender"
                  onChange={this.handleChange}
                  defaultValue="female"
                  checked={this.state.txtgender === "female"}
                   />
                  <label htmlFor="female">Nữ</label>
                </td>
              </tr>
              <tr className="hobbi">
                <td>Sở thich:</td>
                <td>
                  {this.handleCheckBox()}
                </td>
              </tr>
              <tr className="note">
                <td>Ghi chú:</td>
                <td>
                  <textarea
                  rows="3"
                  name="txtnote"
                  onChange={this.handleChange}
                  value={this.state.txtnote}
                  ></textarea>
                </td>
              </tr>
              <div className="button">
                <input type="submit"value="Đăng ký" />
              </div>
            </table>
          </form>
        </div>
      </>
    )
  }
}
