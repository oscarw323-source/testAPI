export type CoursesType = {
  id: number;
  title: string;
  studentsCount: number;
};

export const db: DBType = {
  courses: [
    { id: 1, title: "front-end", studentsCount: 10 },
    { id: 2, title: "back-end", studentsCount: 10 },
    { id: 3, title: "automation", studentsCount: 10 },
    { id: 4, title: "devops", studentsCount: 10 },
  ],
};

export type DBType = { courses: CoursesType[] };
