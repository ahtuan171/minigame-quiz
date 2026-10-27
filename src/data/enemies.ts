import type { Enemy } from "../types/game";

export const enemies: Record<string, Enemy> = {
  "sleepy-guard": {
    id: "sleepy-guard",
    name: "Ngài Gác Cổng Ngái Ngủ",
    dialogue: "Ngáp… Muốn đi qua à? Trả lời câu này trước đã!",
    sprite: "guard",
    isBoss: false,
  },
  "tea-guard": {
    id: "tea-guard",
    name: "Hiệp Sĩ Trà Sữa",
    dialogue: "Đợi trà nguội một chút… Trong lúc chờ, đố bạn nhé!",
    sprite: "guard",
    isBoss: false,
  },
  "calendar-guard": {
    id: "calendar-guard",
    name: "Chú Lính Quên Lịch",
    dialogue: "Hôm nay là thứ mấy nhỉ? Thôi, hỏi chuyện dễ nhớ hơn vậy!",
    sprite: "guard",
    isBoss: false,
  },
  "sailor-guard": {
    id: "sailor-guard",
    name: "Thuyền Trưởng Lá Khô",
    dialogue: "Thuyền lá của ta sẵn sàng. Bạn biết đường ra biển chứ?",
    sprite: "guard",
    isBoss: false,
  },
  "garden-guard": {
    id: "garden-guard",
    name: "Phù Thủy Mầm Non",
    dialogue: "Suỵt… Những chồi cây đang ngủ. Trả lời khẽ thôi nhé!",
    sprite: "guard",
    isBoss: false,
  },
  "honey-guard": {
    id: "honey-guard",
    name: "Ngài Bánh Mật Ong",
    dialogue: "Một câu thôi nhé. Rồi ta còn về ăn bánh.",
    sprite: "guard",
    isBoss: false,
  },
  "poet-guard": {
    id: "poet-guard",
    name: "Thi Sĩ Áo Choàng",
    dialogue: "Ta đang bí vần. Thôi, hỏi đố cho nhanh.",
    sprite: "guard",
    isBoss: false,
  },
  "star-guard": {
    id: "star-guard",
    name: "Người Đếm Sao",
    dialogue: "Ta đếm được nghìn ngôi sao rồi. Còn ánh sáng thì nhanh đến đâu?",
    sprite: "guard",
    isBoss: false,
  },
  "number-guard": {
    id: "number-guard",
    name: "Thầy Pháp Hạt Dẻ",
    dialogue: "Chìa khóa cuối cùng nằm trong những con số nhỏ xíu này!",
    sprite: "guard",
    isBoss: false,
  },
  "marshmallow-boss": {
    id: "marshmallow-boss",
    name: "Đại Vương Kẹo Bông",
    dialogue:
      "Ta là trùm cuối. Hỏi xong câu này là hết, không thêm bài tập đâu.",
    sprite: "boss",
    isBoss: true,
  },
};

export const regions = [
  { name: "Rừng Thì Thầm", chapter: "CHƯƠNG I · LÍNH GÁC CHƯA TỈNH NGỦ" },
  { name: "Thung Lũng Sao Rơi", chapter: "CHƯƠNG II · ĐƯỜNG VÒNG HƠI NHIỀU" },
  { name: "Vườn Hoa Ánh Trăng", chapter: "CHƯƠNG III · SẮP ĐẾN RỒI, THẬT ĐẤY" },
  { name: "Cổng Tháp Ánh Trăng", chapter: "CHƯƠNG CUỐI · ÔNG NÀY HỎI HƠI KHÓ" },
];
