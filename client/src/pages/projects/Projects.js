/*
 * @Descripttion: 
 * @version: 1.1.1
 * @Author: 王鹏
 * @Date: 2021-08-03 23:07:39
 * @LastEditors: 王鹏
 * @LastEditTime: 2021-08-05 21:29:18
 */
import './projects.scss';
import Nav from '../../components/nav';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import ProjectItem from './components/projectItem';

@inject('project')
@observer
class Projects extends Component {
    state = {
        homeRouter: [],  //定义路由列表
        homeName: {},    //定义博客名称
        projectList: [], //定义项目列表
        inpText: "",     //定义搜索内容
        timerId:"",      //延迟定时器id
    }
    componentDidMount() {
        this.getInit();
    }
    componentWillUnmount(){
        this.state.timerId && clearTimeout(this.state.timerId);
    }
    getInit = async () => {
        let { domainStore } = this.props.project;   //获取当前页的mobx仓库

        await domainStore.setProjectRouter();
        await domainStore.setProjectList();

        if (domainStore.homeRouter.length) {
            let homeRouter = domainStore.homeRouter.slice(0, domainStore.homeRouter.length - 1);
            let homeName = domainStore.homeRouter[domainStore.homeRouter.length - 1];

            this.setState({
                homeRouter,
                homeName
            })
        }
        if (domainStore.project_list.length) {
            this.setState({
                projectList: domainStore.project_list
            })
        }
    }
    searchProject = async () => {
        let {inpText} = this.state;

        let { domainStore } = this.props.project;   //获取当前页的mobx仓库

        await domainStore.searchProject(inpText);

        if (domainStore.project_list.length) {
            this.setState({
                projectList: domainStore.project_list
            })
        }
    }
    changeInp = (value) => {
        this.state.timerId && clearTimeout(this.state.timerId);

        this.setState({
            inpText:value
        });

        this.setState({
            timerId:setTimeout(this.searchProject,2000)
        });
    }
    keyDown = (keyCode) => {
        if(keyCode === 13){
            this.state.timerId && clearTimeout(this.state.timerId);

            this.searchProject();
        }
    }
    render() {
        let { homeRouter, homeName, projectList, inpText } = this.state;
        return (
            <div className="projects">
                <nav className="topNav">
                    <Nav homeRouter={homeRouter} homeName={homeName} />
                </nav>
                <div className="project_content">
                    <div className="project_header">
                        <span className="project_header_item">
                            项目总数：{projectList.length}
                        </span>
                        <span className="project_header_item">
                            精选项目：{projectList.filter(item => item.isSelected).length}
                        </span>
                        <span className="project_header_item project_header_input">
                            <span className="input">
                                <input
                                    onInput={(e) => this.changeInp(e.target.value)}
                                    value={inpText}
                                    type="text"
                                    placeholder="请输入要查询的项目"
                                    maxLength={20}
                                    onKeyDown={(e)=>this.keyDown(e.keyCode)}
                                />
                            </span>
                        </span>
                    </div>
                    <div className="project_main">
                        {
                            projectList[0] && projectList.map(item => (
                                <ProjectItem key={item.id} item={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Projects;