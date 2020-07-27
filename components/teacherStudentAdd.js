import React from 'react';
import { Modal } from 'antd';

import stylesheet from 'antd/dist/antd.min.css';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';



export default class TeacherStudentAdd extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("in teacherStudentAdd class....");
    }

    render() {
        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <div>
                    <Modal
                    title="Basic Modal"
                    visible={true}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}
