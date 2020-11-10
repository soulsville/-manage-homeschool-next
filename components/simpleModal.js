import React from 'react';
import { Modal, Button, Form, Space, Input, Switch, Avatar, Upload, Alert } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';



export default class SimpleModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in SimpleModal class....");
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    <Modal
                        title={this.props.modalTitle}
                        visible={this.props.modalVisible}
                        onCancel={this.props.handleModalCancel}
                        onOk={this.props.handleModalOnOk}
                        footer={[
                            <Button key="back" onClick={(e) => this.props.handleBackClick(e)}>
                                Return
                            </Button>,
                            <Button key="submit" type="primary" loading={this.props.loadingModal} onClick={(e) => this.props.handleModalSubmitClick(e)}>
                                Submit
                            </Button>,
                        ]}
                    >
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}
