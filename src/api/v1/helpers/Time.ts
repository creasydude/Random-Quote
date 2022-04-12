export const compareTime = (time: string) => {
  const nowTime: number = new Date().getTime();
  const expireTime: number = new Date(time).getTime();
  return expireTime > nowTime;
  // if time not expire return true
};

export const addTime = (minutes: number) => {
  const nowTime: number = new Date().getTime();
  const newTime: number = nowTime + minutes * 60000;
  return new Date(newTime).toISOString();
};
