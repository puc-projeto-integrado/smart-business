import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import '../../../css/charts.css'
import ChartsLegend from "./ChartsLegend";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#000000', '#cccccc'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default class ChartsPie extends PureComponent {

    render() {
        const data = this.props.data;
        let i = 0;

        return (
            <div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip isAnimationActive={false}/>
                    </PieChart>
                </ResponsiveContainer>

            </div>
            <div className="row">
                <div className="col-md-12">
                {
                    data.map(()=>{
                        let color = COLORS[i];
                        let title = data[i].name;
                        let value = data[i].value;
                        i++
                        return <ChartsLegend color={color} title={title} value={value}/>
                    })
                }
                </div>
            </div>
        </div>
        );
    }
}