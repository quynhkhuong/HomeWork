import React, { Component } from 'react';
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
import { fromJS } from 'immutable';


import './style.scss';
import Column from './components/Column/';
import AddNewModal from './components/AddNewModal/';
import Task from './components/Task/';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { v1 as uuidv1 } from 'uuid';
uuidv1();


class App extends Component {

    state = {
        displayModal: false,
        columns: fromJS([
            { id: 'td', title: 'TO DO', tasks: [{id: 1, content: 'Demo task', time: '04/15/2019, 9:25:35 PM'}] },
            { id: 'ip', title: 'IN PROGRESS', tasks: [] },
            { id: 'de', title: 'DONE', tasks: [] }
        ]),

        selectedColumn: '',

        taskContent: '',

        editingTaskId: null,
    }

    render() {
        const { columns, displayModal } = this.state;

        return (

            <div className="App">
                <h1 className="App__title">TO DO LIST</h1>
                <DragDropContext onDragEnd={this.handleSaveDrag}>
                    <div className="App__content">
                    {
                        columns.map((column, columnIndex) => (
                            <Column
                                key={column.get('id')}
                                column={column}
                                handleAddNewTask={this.handleToggleModal}>

                                <Droppable droppableId={column.get('id')}>
                                {
                                    provided => (
                                        <div ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{ minHeight: '300px' }}
                                        >
                                            {
                                                column.get('tasks').map((task, taskIndex, editedTaskId) => (
                                                    <Task key={task.get('id')}
                                                        index={taskIndex}
                                                        isEditing={task.get('id') === editedTaskId}
                                                        handleChangeTaskContent={this.handleChangeTaskContent}
                                                        task={task}
                                                        handleEdit={this.handleEdit}
                                                        handleCancelEdit={this.handleCancelEdit}
                                                        handleChooseEditTask={this.handleChooseEditTask(columnIndex, taskIndex, task.get('id'))}
                                                        handleDeleteTask={this.handleDeleteTask(columnIndex, taskIndex)}
                                                         />
                                                    ))
                                                }
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }
                                </Droppable>
                            </Column>
                        ))
                    }
                    </div>
                </DragDropContext>
                {displayModal &&
                    <AddNewModal handleToggleModal={this.handleToggleModal}
                        selectedColumn={this.state.selectedColumn}
                        handleChangeSelectedColumn={this.handleChangeSelectedColumn}
                        taskContent={this.state.taskContent}
                        handleChangeTaskContent={this.handleChangeTaskContent}
                        handleAddNewTask={this.handleAddNewTask}
                    />
                }
            </div>
        );
    }

    

    handleChangeSelectedColumn = (selectedColumn) => () => {

        console.log("k")
        this.setState({ selectedColumn: selectedColumn })
    }

    handleChangeTaskContent = (e) => this.setState({ taskContent: e.target.value })

    handleToggleModal = (choosenColumn = '') => () => {
            console.log("co")
            this.setState(prevState => ({
                displayModal: !prevState.displayModal,
                selectedColumn: choosenColumn
            }))
        }
    handleAddNewTask = () => {
        // Lấy nội dung task từ state
        const { taskContent } = this.state

        // Kiểm tra xem nội dung có rỗng hay không trước khi lưu lại
        if (taskContent.trim() === '') {
                return toastr.warning('Please enter your task', 'Notice', { timeOut: 2000 });
         }

        // Lấy id cột mà chúng ta muốn thêm task vào từ state
        const { selectedColumn, columns } = this.state;

        // Tạo task mới với đầy đủ thông tin là id, nội dung và thời gian tạo
        const newTask = fromJS({
            id: uuidv1(),
            content: taskContent,
            time: new Date().toLocaleString()
        });

        // Lấy vị trí cột đó trong state
        const columnIndex = columns.findIndex(column => column.get('id') === selectedColumn);

        // Lưu lại task đó vào cột
        const updatedColumn = columns.updateIn(
            [columnIndex, 'tasks'],
            tasks => tasks.push(newTask)
        );

        // Cập nhật lại state, ở đây chúng ta đồng thời sẽ reset lại các state của modal 
        // như đóng modal và clear nội dung task, cột được chọn
        this.setState({
            displayModal: false,
            selectedColumn: '',
            taskContent: '',
            columns: fromJS(updatedColumn)
        })
    }

    handleDeleteTask = (columnIndex, taskIndex) => () => {
        const result = window.confirm('Are your sure to delete this task?');
        if (result) {
            const { columns } = this.state;
            const updatedColumn = columns.updateIn(
                [columnIndex, 'tasks'],
                tasks => tasks.remove(taskIndex));
            this.setState({ columns: fromJS(updatedColumn) }, () => {
                toastr.success('Delete task success', 'Notice', { timeOut: 2000 });
            });
        }
    }

    handleChooseEditTask = (columnIndex, taskIndex, taskId) => () => {
        this.setState({
            editingColumnIndex: columnIndex,
            editingTaskIndex: taskIndex,
            editedTaskId: taskId
        })
    }

    handleCancelEdit = () => {
        this.setState({
            editingTaskId: null,
            taskContent: ''
        });
    }

    handleEdit = () => {
        // Lấy các dữ liệu cần thiế t trong state
        const { columns, editingColumnIndex, taskContent, editingTaskIndex } = this.state;
        // Cập nhật nội dung task theo index của cột và của task
        const updatedColumn = columns.updateIn(
            [editingColumnIndex, 'tasks'],
            tasks => tasks.setIn([editingTaskIndex, 'content'], taskContent)
        );
        // Lưu lại nội dung mới
        this.setState({
            editingColumnIndex: '',
            taskContent: '',
            editedTaskId: null,
            editingTaskIndex: null,
            columns: fromJS(updatedColumn)
        });
    }

    // onDragEnd()
    // {
    //     destination: {
    //         droppableId: "ip"
    //         index: 0
    //     }
    //     draggableId: "aeb38dd0-5f86-11e9-828f-b7135a2fc491"
    //     reason: "DROP"
    //     source: {
    //         droppableId: "td"
    //         index: 0
    //     }
    // }

    handleSaveDrag = (result) => {
        // Lấy dữ liệu cần thiết từ result
        const { source, destination, reason } = result;
        
        // Kiểm tra điều kiện
        if (reason === 'DROP' && destination) {
        
            // Lấy dữ liệu cột từ state
            const { columns } = this.state;
            
            // Lấy cột gốc mà task được kéo đi
            const sourceColumnIndex = columns.findIndex(column => column.get('id') === source.droppableId);
            
            // Lấy nội dung task đó
            const task = columns.getIn([sourceColumnIndex, 'tasks', source.index]);
            
            // Xóa task đó khỏi cột gốc
            let updatedColumn = columns.updateIn(
                [sourceColumnIndex, 'tasks'],
                tasks => tasks.remove(source.index)
            );
            
            // Lấy cột đích đến của task
            const destinationColumnIndex = columns.findIndex(column => column.get('id') === destination.droppableId);
            
            // Lưu task đó vào cột mới
            updatedColumn = updatedColumn.updateIn(
                [destinationColumnIndex, 'tasks'],
                tasks => tasks.insert(destination.index, task)
            );
            
            // Cập nhật dữ liệu của state
            this.setState({
                columns: fromJS(updatedColumn)
            });
        }
    }


}

export default App;
