/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-04 11:24:13
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-04 17:33:48
 */
import React from 'react';
import "./projectItem.scss";
import { StarTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ProjectItem = (props) => {
    return (
        <div className="projectItem">
            {
                props.item.id && (<Link to={props.item.path}>
                    <StarTwoTone twoToneColor="#F78F23" id="isSelected" className={props.item.isSelected ? 'active' : ''} />
                    <div className="projectItem_header">
                        <span className="projectItem_header_name">{props.item.name}</span>
                        <span className="projectItem_header_createDate">{props.item.createDate}</span>
                    </div>
                    <div className="projectItem_main">
                        {props.item.introduce}
                    </div>
                    <div className="projectItem_footer">
                        <span
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    let arr = props.item.downloadLink.split(',');
                                    window.location.href = arr.length > 0?arr[0]:"";
                                }
                            }
                        >Github查看</span>
                        <span
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    let arr = props.item.downloadLink.split(',');
                                    window.location.href = arr.length > 1?arr[1]:"";
                                }
                            }
                        >Gitee查看</span>
                    </div>
                </Link>)
            }
        </div>
    );
};

export default ProjectItem;