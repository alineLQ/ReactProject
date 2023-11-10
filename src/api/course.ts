import request from "@/utils/request";

export const testPost = () => {
  return request.post("classes/ReactTest", { name: "武当", score: 100 });
};

export interface ICategoryParams {
  objectId?: string; //类目ID
  cateName: string; //类目名称
  fatherId: string; //父级类目ID
  status: boolean; //分类上架状态
  children?: ICategoryParams[];
}

// 新增课程分类

export const categoryPost = (categoryObj: ICategoryParams) => {
  return request.post("classes/ReactCategory", categoryObj);
};

// 查询类目
interface CateConditionType {
  fatherId?: string;
}
export const categoryGet = (where: CateConditionType = { fatherId: "0-0" }) => {
  return request.get("classes/ReactCategory", {
    params: {
      where,
    },
  });
};

// 更新类目

export const categoryPut = (objectId: string, status: boolean) => {
  return request.put(`classes/ReactCategory/${objectId}`, { status });
};

// 课程录入

export interface ICourseType {
  name: string;
  info: string;
  poster: string;
  isVip: boolean;
  category: [string, string];
  catelv1: string;
  catelv2: string;
  desc: string;
}

export const coursePost = (objectObj: ICourseType) => {
  return request.post("classes/ReactArtcle", objectObj);
};

// 加载课程
export interface ICourseConditionType {
  created_at?: string;
  current?: number;
  pageSize?: number;
  isVip?: string | boolean;
  name?: string;
  info?: string | { $regex: string; $options: "i" };
}

type CourseKeyType = keyof ICourseConditionType;
export const courseGet = (params: ICourseConditionType) => {
  delete params.created_at;
  delete params.current;
  delete params.pageSize;

  for (let attr in params) {
    if (params[attr as CourseKeyType] === "") {
      delete params[attr as CourseKeyType];
    }
  }

  // 将 vip课程 和 免费课程 转换为 数字 1 和 0 即为 true 和 false
  if (params.isVip && params.isVip !== "2") {
    params.isVip = Boolean(Number(params.isVip));
  }
  // 将全部课程的 2 删除掉 isVip 判断字段
  if (params.isVip && params.isVip === "2") {
    delete params.isVip;
  }
  // 对 课程简介 进行模糊搜索功能，设置正则查询规则

  if (params.info) {
    params.info = { $regex: `${params.info}`, $options: "i" };
  }
  let search = JSON.stringify(params);
  return request.get(`classes/ReactArtcle?where=${search}`);
};
