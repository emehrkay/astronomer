import React, { Component } from 'react';
import './Modal.css';


class Modal extends Component{
    constructor(props){
        super(props)
        this.state = {
            'content': '',
            'shown': false
        }

        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.hideCoverClick = this.hideCoverClick.bind(this)
        this.setContent = this.setContent.bind(this)
        this.props.emitter.addListener('modal_show', this.show);
        this.props.emitter.addListener('modal_hide', this.hide);
        this.props.emitter.addListener('modal_content', this.setContent);
    }

    setContent(content){
        this.setState({
            'content': content
        })
    }

    show(){
        this.setState({
            'shown': true
        });
    }

    hide(){
        this.setState({
            'shown': false
        });
    }

    hideCoverClick(e){
        if(e && /[ModalCover|modal_close_link]/.test(e.target.className)){
            this.hide();
        }
    }

    render(){
        const klasses = {
            'ModalCover': true,
            'modal_shown': this.state.shown
        }

        if(this.state.shown){
            return <div className="ModalCover modal_shown" onClick={this.hideCoverClick}>
                <a href="#" className="modal_close_link" onClick={this.hideCoverClick}>close</a>
                <div className="Modal">
                    {this.state.content}
                </div>
            </div>
        }else{
            return <div></div>
        }
    }
}

export default Modal
