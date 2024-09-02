import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { VoteChartProps } from "../../constants/host.types";
import './VoteChart.css';


const VoteChart = ({questionTitle, voteChoices}: VoteChartProps) => {

    const data = voteChoices.map(voteChoice => ({
        name: voteChoice.name,
        votes: voteChoice.votes,
    }));

    return (
        <div className="chart-container">
            <span className="chart-title">{questionTitle}</span>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={false}/>
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
};

export default VoteChart;