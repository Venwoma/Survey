import { Table, Menu, Dropdown, Input } from 'antd';
import table from './index.module.scss';
import { useState } from 'react';
import { Write,TrendTwo } from '@icon-park/react';
import { MoreOutlined } from '@ant-design/icons';
export default function ZTable() {
    // 表头
    const columns = [
        {
            title: 'Survey Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div className={table.titleBox}>
                    
                    <div className={table.rightContent}>
                        {record.isRename ? (
                            <Input
                                autoFocus
                                value={record.newTitle}
                                className={table.titleInput}
                                onChange={(e) => handleInputName(e, record)}
                                onBlur={() => handleUpdateName(record)}
                            ></Input>
                        ) : (
                            <span className={table.title}>{text}</span>
                        )}
                        <span className={table.date}>{`Last modified: ${record.date}`}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Triggers',
            dataIndex: 'triggers',
            key: 'triggers',
        },

        {
            title: 'Responses',
            dataIndex: 'responses',
            key: 'responses',
        },
        {
            title: 'Last responsed',
            dataIndex: 'lastResponse',
            key: 'lastResponse',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <div className={`${table.statusTag} ${table[text]}`}>{text}</div>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <div className={table.actionBox}>
                    <div className={table.actionButton}>
                        <Write theme="outline" size="18" fill="#333"/>
                    </div>
                    <div className={table.actionButton}>
                        <TrendTwo theme="outline" size="18" fill="#333"/>
                    </div>
                    <Dropdown
                        overlay={
                            <Menu
                                items={[
                                    {
                                        key: '0',
                                        label: 'Pause',
                                        onClick: () => handlePause('pause', record),
                                    },
                                    {
                                        key: '1',
                                        label: 'Preview',
                                        onClick: () => handlePreview('preview', record),
                                    },
                                    {
                                        key: '2',
                                        label: 'Rename',
                                        onClick: () => handleRename('rename', record),
                                    },
                                    {
                                        key: '3',
                                        label: 'Delete',
                                        onClick: () => handleDelete('delete', record),
                                    },
                                ]}
                            ></Menu>
                            
                        }
                        trigger={['click']}
                    >
                        <div className={table.actionButton}> 
                            <MoreOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
                        </div>
                    </Dropdown>
                </div>
            ),
        },
    ];
    //   暂停
    const handlePause = (operate, rowData) => {
        console.log(operate, rowData);
    };
    //   预览
    const handlePreview = (operate, rowData) => {
        console.log(operate, rowData);
    };
    //   重命名
    const handleRename = (operate, rowData) => {
        console.log(operate, rowData);
        setTableData((prev) => prev.map((item) => (item.id === rowData.id ? { ...item, isRename: true } : item)));
    };
    //   删除
    const handleDelete = (operate, rowData) => {
        console.log(operate, rowData);
    };
    //   问卷标题修改输入
    const handleInputName = (e, rowData) => {
        console.log(e, rowData);
        setTableData((prev) => prev.map((item) => (item.id === rowData.id ? { ...item, newTitle: e.target.value } : item)));
    };
    //   失焦更新标题
    const handleUpdateName = (rowData) => {
        // 接口调用成功后执行
        setTableData((prev) => prev.map((item) => (item.id === rowData.id ? { ...item, title: rowData.newTitle, isRename: false } : item)));
    };
    //   表格数据
    const [tableData, setTableData] = useState([
        {
            id: '1',
            title: '标题1',
            newTitle: '标题1',
            date: '1 hours ago',
            category: 'Conversion Optimization',
            triggers: 1024,
            responses: 560,
            lastResponse: '20 minutes ago',
            status: 'Active',
        },
        {
            id: '2',
            title: '标题2',
            newTitle: '标题2',
            date: '2 hours ago',
            category: 'Conversion Optimization',
            triggers: 1024,
            responses: 560,
            lastResponse: '20 minutes ago',
            status: 'Draft',
        },
        {
            id: '3',
            title: '标题3',
            newTitle: '标题3',
            date: '3 hours ago',
            category: 'Conversion Optimization',
            triggers: 1024,
            responses: 560,
            lastResponse: '20 minutes ago',
            status: 'Paused',
        },
    ]);

    return (
        <div className={table.tableBox}>
            <Table columns={columns} dataSource={tableData} rowClassName={table.row} rowKey={(record) => record.id}></Table>
        </div>
    );
}
