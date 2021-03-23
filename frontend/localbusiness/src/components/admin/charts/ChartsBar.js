import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const staticData = [
    {
        name: 'Santa Catarina',
        Quantidade: 1200,
    },
    {
        name: 'Rio de Janeiro',
        Quantidade: 2400,
    },
    {
        name: 'São Paulo',
        Quantidade: 600,
    },

];

export default class ChartsBar extends PureComponent {

    render() {

        let tempData = this.props.data;
        let barDataKey = this.props.barDataKey;
        let data = [];

        tempData.map((item)=>{
            let business = item.name;
            if(business.length>20) {
                business = business.substr(0, 20) + "..."
            }
            let value = item.value;
            let row = {"name":business, [barDataKey]:value}
            data.push(row);
        });

        console.log(data);

        return (
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey={barDataKey} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            </div>
        );
    }
}
