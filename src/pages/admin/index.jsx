import { commonStore } from '../../store';
import Header from '../../compoments/admin/header';
import ZSelect from '../../compoments/admin/zSelect';
import ZTable from '../../compoments/admin/zTable';
export default function AdminIndex() {
    const messageApi = commonStore((state) => state.messageApi);
    const showAdminLeft = commonStore((state) => state.showAdminLeft);
    const set = commonStore.useSet();
    const test = () => {
        messageApi.info(showAdminLeft ? '隐藏左边栏' : '展开左边栏');
        set((state) => (state.showAdminLeft = !showAdminLeft));
    };
    // 筛选下拉数据
    const filterSelects = [
        {
            value: '0',
            name: 'category',
            width: '143',
            showIcon: true,
            options: [
                {
                    value: '0',
                    label: 'All Category',
                },
                {
                    value: '1',
                    label: 'Coversion Optimization',
                },
                {
                    value: '2',
                    label: 'User Experience',
                },
                {
                    value: '3',
                    label: 'Product Feedback',
                },
                {
                    value: '4',
                    label: 'Customer Retention',
                },
                {
                    value: '5',
                    label: 'Sale Enablement',
                },
            ],
        },
        {
            value: '0',
            name: 'status',
            width: '124',
            options: [
                {
                    value: '0',
                    label: 'All Status',
                },
                {
                    value: '1',
                    label: 'Active',
                },
                {
                    value: '2',
                    label: 'Draft',
                },
                {
                    value: '3',
                    label: 'Paused',
                },
            ],
        },
        {
            value: '0',
            name: 'date',
            width: '154',
            options: [
                {
                    value: '0',
                    label: 'Last modified',
                },
                {
                    value: '1',
                    label: 'Date Created',
                },
            ],
        },
        {
            value: '0',
            name: 'response',
            width: '127',
            options: [
                {
                    value: '0',
                    label: 'Most responses',
                },
                {
                    value: '1',
                    label: 'Fewest responses',
                },
            ],
        },
    ];
    return (
        <div className="index-container">
            <div className="index-header">
                <Header title="Survey  Dashboard" buttonText="New Survey"></Header>
                
            </div>
            <div className="index-filter">
                {filterSelects.map((select) => (
                    <ZSelect value={select.value} options={select.options} width={select.width} showPreIcon={select.showIcon}></ZSelect>
                ))}
            </div>
            <div className="table-scroll-wrapper">
                <div className="index-table">
                    <ZTable></ZTable>
                </div>

            </div>
        </div>
    );
}
