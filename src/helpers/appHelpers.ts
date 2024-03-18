export const getPercentage = (data: Data): number => {
  const totalValues = { total: 0, checked: 0 };
  data.forEach((group) => {
    group.tasks.forEach((task) => {
      if (task.checked) {
        totalValues.checked = totalValues.checked + task.value;
      }
      totalValues.total = totalValues.total + task.value;
    });
  });
  return Math.round((totalValues.checked * 100) / totalValues.total);
};
