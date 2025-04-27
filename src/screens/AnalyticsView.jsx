import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { TrophyIcon as OutlineTrophyIcon, StarIcon as OutlineStarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { NavBar } from "../components/NavBar";
import characterBlue from "../assets/CharacterBlue.png";
import characterPink from "../assets/CharacterPink.png";
import characterOrange from "../assets/CharacterOrange.png";
import { ChildBubble } from "../components/ChildBubble";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export const AnalyticsView = () => {
  const [familyData, setFamilyData] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const parentData = JSON.parse(localStorage.getItem("parent_data")) || { childrenIds: [] };
    const children = parentData.childrenIds.map((childId) =>
      JSON.parse(localStorage.getItem(`child_${childId}`))
    ).filter(Boolean);

    const family = children.map((child) => {
      const allTasks = [
        ...(child.assignedTasks || []),
        ...(child.personalTasks || []),
        ...(child.archivedTasks || []) // Include archived tasks
      ];
      const tasksCompleted = allTasks.filter((task) => task.taskStatus).length;

      return {
        name: child.name,
        theme: child.theme,
        tasksCompleted,
        starsEarned: child.stars || 0,
        character: child.theme === "pink" ? characterPink : characterOrange,
      };
    });

    setFamilyData(family);
  }, []);

  const getTopThree = (data, key) => {
    return [...data]
      .sort((a, b) => b[key] - a[key])
      .slice(0, 3);
  };

  const renderPodium = (topThree, key) => {
    if (!topThree || topThree.length === 0) {
      return (
        <div className="text-center">
          <p className="text-sm text-gray-500">No data available</p>
        </div>
      );
    }

    const reorderedTopThree = [topThree[1], topThree[0], topThree[2]];

    return (
      <div className="flex justify-center items-end gap-4">
        {reorderedTopThree.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            {member?.name === "Parent" ? (
              <div
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300 flex items-center justify-center"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              >
                <img
                  src={member.character}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <ChildBubble
                childId={member?.id}
                childName={member?.name}
                childTheme={member?.theme}
                onSelect={() => {}}
              />
            )}

            <div
              className={`w-16 h-${index === 1 ? "20" : index === 0 ? "16" : "12"} bg-${
                index === 1 ? "yellow-400" : index === 0 ? "blue-400" : "orange-400"
              } rounded-t-lg flex items-center justify-center`}
              style={{
                backgroundColor:
                  index === 1
                    ? "#f59e0b"
                    : index === 0
                    ? "#60a5fa"
                    : "#fb923c",
              }}
            >
              <span className="text-white text-lg font-bold">{index === 1 ? 1 : index === 0 ? 2 : 3}</span>
            </div>

            {/* Keep only the name below the points */}
            <div className="text-center mt-1">
              <p className="text-xs text-gray-500">{member?.[key]} points</p> {/* Points */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const totalTasks = familyData.reduce((sum, member) => sum + member.tasksCompleted, 0);
  const totalStars = familyData.reduce((sum, member) => sum + member.starsEarned, 0);

  const barChartData = {
    labels: familyData.map((member) => member.name),
    datasets: [
      {
        label: "Tasks Completed",
        data: familyData.map((member) => member.tasksCompleted),
        backgroundColor: familyData.map((member) =>
          member.theme === "pink" ? "#FF69B4" : member.theme === "orange" ? "#FFA500" : "#4A90E2"
        ),
      },
    ],
  };

  const pieChartData = {
    labels: familyData.map((member) => member.name),
    datasets: [
      {
        data: familyData.map((member) => member.starsEarned),
        backgroundColor: familyData.map((member) =>
          member.theme === "pink" ? "#FF69B4" : member.theme === "orange" ? "#FFA500" : "#4A90E2"
        ),
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const name = context.label;
            const stars = context.raw;
            return `${name}: ${stars} ⭐`;
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-white"> {/* Changed background to white */}
      <NavBar parent={true} />
      <div className="p-4">
        <div className="text-left mb-4">
          <h1 className="text-3xl font-bold text-black">Family Insights Dashboard</h1>
          <p className="text-sm text-black mt-1">
            See who's been the most productive and earned the most stars!
          </p>
        </div>

        {/* First Row of Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Total Tasks Completed */}
          <div className="relative bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-400"></div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <p className="text-sm text-black">Total Tasks Completed</p>
                <CheckCircleIcon className="w-6 h-6 text-blue-400 opacity-70 hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-2xl font-bold text-black mt-4">{totalTasks}</p>
            </div>
          </div>

          {/* Total Stars Earned */}
          <div className="relative bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <p className="text-sm text-black">Total Stars Earned</p>
                <OutlineStarIcon className="w-6 h-6 text-yellow-400 opacity-70 hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-2xl font-bold text-black mt-4">{totalStars}</p>
            </div>
          </div>

          {/* Task Champion */}
          <div className="relative bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-400"></div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <p className="text-sm text-black">Task Champion</p>
                <OutlineTrophyIcon className="w-6 h-6 text-green-400 opacity-70 hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-2xl font-bold text-black mt-4">
                {familyData.length > 0 ? getTopThree(familyData, "tasksCompleted")[0]?.name : "N/A"}
              </p>
            </div>
          </div>

          {/* Star Collector */}
          <div className="relative bg-white rounded-lg border-2 border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-2 bg-purple-400"></div>
            <div className="p-6 flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <p className="text-sm text-black">Star Collector</p>
                <OutlineStarIcon className="w-6 h-6 text-purple-400 opacity-70 hover:scale-110 transition-transform duration-300" />
              </div>
              <p className="text-2xl font-bold text-black mt-4">{familyData.length > 0 ? getTopThree(familyData, "starsEarned")[0]?.name : "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Rest of the Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Task Completion Champions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-center text-black mb-2">Task Completion Champions</h2>
            {renderPodium(getTopThree(familyData, "tasksCompleted", true), "tasksCompleted")} {/* Exclude parent */}
          </div>

          {/* Star Collection Champions */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-center text-black mb-2">Star Collection Champions</h2>
            {renderPodium(getTopThree(familyData, "starsEarned", true), "starsEarned")} {/* Exclude parent */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tasks Completed Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-center text-black mb-2">Tasks Completed</h2>
            <div className="h-64">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      ticks: {
                        stepSize: 1, // Ensure only whole numbers are displayed
                        callback: function (value) {
                          return Number.isInteger(value) ? value : null; // Only show whole numbers
                        },
                      },
                      beginAtZero: true, // Start the y-axis at 0
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Stars Earned Donut Chart */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-center text-black mb-2">Stars Earned</h2>
            <div className="h-64 relative">
              <Pie
                data={pieChartData}
                options={{
                  ...pieChartOptions,
                  cutout: "70%", // Makes it a donut chart
                }}
              />
              {/* Custom Labels */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {familyData.map((member, index) => (
                  <div key={index} className="text-center mb-2">
                    <p className="text-sm font-bold text-black">{member.name}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-center">
                      {member.starsEarned} <span className="text-yellow-400 ml-1">⭐</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};