import React from 'react';
import {Button, Container, Input, InputGroup, InputGroupAddon} from "reactstrap";
import Footer from './Footer';
import axios from "axios";
import { Row, Col} from "reactstrap";
import moment from 'moment';
import 'moment-timezone';
import like from '../assets/images/like.png';
import dislike from '../assets/images/dislike.png';
import download from '../assets/images/download.png';
import {  FormGroup, Form } from 'reactstrap';
import { UrlContext } from '../contexts/urlContext';




export default class Search extends React.Component {
    state = {
        searchItem: "",
        compelete: false,
        list: "",
        posts:[],
        files:'',


    };
    getSearch = () => {
        axios({
          url: 'http://localhost:3000/search',
          method: 'POST',
          data:{
              'category':this.state.searchItem
          }
      }).then(response => {
        const data = response.data;
        this.setState({
          posts:data 
        })
      })
    }

    getImage(file){
        let img =file
        if(file!=='images/userProfile.png'){
            img= this.state.serverUrl +'file/'+ file
          }
          return img
    }
    // Search = () => {

    //     if (this.state.searchItem !== '') {

    //         this.setState({
    //             compelete: true
    //         });

    //         axios({
    //             url: 'http://localhost:8080/search/'+ this.state.searchItem,
    //         }).then(response => {


    //             this.setState({

    //                     list: response.data,
    //                 }
    //             );
    //             console.log(this.state.list);

    //         }).catch(error => {
    //             console.log(error);

    //         })
    //     } else {
    //         this.setState({
    //             logCompelete: false,
    //         })
    //     }


    // };

    displayBlogPost = (posts)=> {
        

        if(!posts.length) return <div className='jumbotron mx-auto mt-3' style={{"width":"70%"}}> <h4 className='text-center'>There is currently no posts yet</h4> </div>

        return posts.map((posts,index) => (
          <Col lg={{ span: 3, offset: 1 }}   sm="12">
             
             <div className="jumbotron mt-5 mx-5 " 
             style={
             {"width":"70%","outlineStyle": "solid","outlineWidth":"1px","outlineColor":"#5c7d92","backgroundColor":"white","boxShadow":"5px 5px 5px 5px #dfebf2"}}>
              
                <div className="row">
                  <div className="col-sm-3 mt-0">
                    <img src={this.getImage(posts.userImage)} 
                    style={{"width": "110px","height":"110px","margin-top":"-10px",
                    "borderRadius": "50%", "border":'solid 1px lightgrey'}}/>
                  </div>

                  <div className="col-sm-7 d-flex">
                    <a  className="ml-md-3 " style={{color:'#5c7d92',fontWeight:'bold'}} >{posts.username}<br/>                  
                    <small className="text-muted mt-1 mx-lg-0 ml-md-3 ">{moment(posts.date.$date).format("DD/MMM/YYYY")}</small>
                    </a>
                  <div className="col-sm-1 ml-3" >
                    <h6 className="ml-3" style={{"color": "darkgrey"}}>
                      {posts.like.length}
                    </h6>
                  </div>
                  <div className="col-sm-1 ml-2">
                    <img src={like} className="like" title="like" onClick={()=>this.plusLike(posts._id)}/>
                  </div>
                  <div className="col-sm-1 mx-2">
                    <img src={dislike} className="dislike" title="dislike" onClick={()=>this.plusDisLike(posts._id)}/>
                  </div>
                  <div className="col-sm-1 ml-2">
                    <h6 style={{"color": "darkgrey"}}>
                      {posts.dislike.length}
                    </h6>
                  </div>

               
                </div>


                </div>
                <br></br>
                { posts._id.$oid==this.state.likedPostId &&
                  <small style={{color:'#E67E22'}}>{this.state.displaylikemsg}</small>
                }
                { posts._id.$oid==this.state.dislikedPostId &&
                  <small style={{color:'#E67E22'}}>{this.state.displaydislikemsg}</small>
                }

                <hr />
                    <h5 className="text-left font-weight-bold mt-2" style={{color:'black'}}>{posts.title}</h5>
                <p className=" text-left " style={{"word-wrap": "break-word"}} ><span className="font-weight-bold" style={{color:'black'}}>Category:</span> {posts.category}</p>
                <p className=" text-left " style={{"word-wrap": "break-word"}} style={{color:'#01061c'}} >{posts.content}</p>

              
                <div className="row my-4 justify-content-start">
                <div className="col-sm-1">
                    <img src={download} className="downloadImg" 
                    onClick={this.getFile.bind(this,posts)} 
                    title="download"/>
                  </div>
                  <div className="col-sm-3">
                    <p className="text-nowrap" style={{"width": "6rem"}}>
                      {posts.file}
                    </p>
                  </div>
                </div>

                <div className="row postBox mx-0 " style={{"backgroundColor":"#f0f0f0","boxShadow":"4px 4px 4px 4px #f0f0f0"}}>

                {posts.comments.map((value, index) => {
                  return(
                    <React.Fragment>
                      <div className="row" >
                          <div className="col-sm-8">
                            <a className="mt-2 ml-2 small"  style={{color:'#5c7d92',fontWeight:"bold"}}>{posts.comments[index]['username']}</a>
                            <small className="text-muted mx-3">{moment(posts.comments[index].date.$date).format("DD/MMM/YYYY")}</small>
                          </div>
                      </div>
                      <div className="row col-sm-12" >
                        <p className=" text-left ml-3" style={{"word-wrap": "break-word"}} > {posts.comments[index]['comment']}</p>
                        <div className="divider"></div>
                      </div>
                    </React.Fragment>
                  );
                })}

                  <div className="row col-sm-12 py-2 mx-0" >
                    <Form inline>
                      <FormGroup>
                        <Input type="textarea" name="text" id={posts._id} placeholder='new comment' 
                        onChange={e=>{this.setState({comment:e.target.value, displaymsg : ''})}}/>
                      </FormGroup>
                      <Button className="ml-3 btn-primary"
                      onClick={()=>{
                      this.addComment(posts._id);
                      // this.setState({comment:''})
                      }}
                      size="sm">send</Button>
                    </Form>
                  </div>
                  
                </div>

            </div>
         </Col>

            ));
    }
        render()
        {
            return (

                <div className={'block'}>
                    <br/>
                    <Container>

                        <br/>

                        <div className="containerSearch">

                            <InputGroup>
                                <Input placeholder="search..." onChange={e => {
                                    this.setState({searchItem: e.target.value})
                                }}/>
                                <InputGroupAddon addonType="append">
                                    <Button color="secondary"><img className="searchImg"
                                                                   src={require('../assets/images/search.png')}
                                                                   title={"search"} alt={"search"}
                                                                   onClick={this.getSearch}/></Button>
                                </InputGroupAddon>
                            </InputGroup>


                        </div>
                        <Row className="blog mt-5">
               {this.displayBlogPost(this.state.posts)}
             </Row>

                        <Footer/>

                    </Container>
                </div>
            );
        }


}
