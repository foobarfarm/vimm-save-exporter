export const configureFakeSystemTimeForJest = (): { fakeDate: Date } => {
  const fakeDate = new Date('1981-06-09');
  jest.useFakeTimers().setSystemTime(fakeDate);

  return { fakeDate };
};
