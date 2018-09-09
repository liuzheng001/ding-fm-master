import React,{ Component }  from 'react'
import  classnames from 'classnames'
import {Link} from 'react-router'
import {Button} from 'saltui'

import './Sign.css'
import login from "../../app/variables";



class Sign extends Component {
  constructor(props) {
    super(props)

    }


  componentWillReceiveProps(nextProps) {
  }


  componentWillMount(){

  }

  render() {
     return (
         <div>
              <div >
                  <li><Link to="/"><Button>back</Button></Link></li>
              </div>
              <div >签到</div>
              <div >
                  <a href="#" ><i ></i></a>
              </div>

        <div page="page">
          <div id="signcontent" className="page-content">
          <div className="content-block" style={{"textalign":"center"}}>
          <p id="content" >
          </p>
        </div>

        <p className="center" id="Time"></p>

        <div id="allmap" className="map" style={{margin:"auto",height: "300px",width: "100%",border: "solid 1px #808080"}}>  </div>

        <p className="center" id="signMessage" ></p>
        <a href="#" id="submitButton" className="button button-big button-round button-submit">签到 </a>

        <div id="updateflag" style={{display: "none"}}>false</div>


        </div>
        </div>
        </div>
     )}
}



export default Sign
