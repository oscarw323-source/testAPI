export type CoursesType = {
  id: number;
  title: string;
  studentsCount: number;
};

export type DBType = { courses: CoursesType[] };
