import type { Question } from "../types/game";

// Edit the content here. Every encounter has four unique choices and one answer.
export const questions: Question[] = [
  {
    id: "first-light",
    floor: 1,
    question: "Hành tinh nào được gọi là “Hành tinh Đỏ”?",
    options: [
      { id: "a", text: "Sao Kim" },
      { id: "b", text: "Sao Hỏa" },
      { id: "c", text: "Sao Mộc" },
      { id: "d", text: "Sao Thổ" },
    ],
    correctAnswerId: "b",
    hint: "Tên của hành tinh này gợi đến lửa. Màu đỏ đến từ oxit sắt trên bề mặt đấy!",
    enemyId: "sleepy-guard",
  },
  {
    id: "warm-tea",
    floor: 2,
    question:
      "Ở áp suất khí quyển tiêu chuẩn, nước tinh khiết sôi ở bao nhiêu độ C?",
    options: [
      { id: "a", text: "50°C" },
      { id: "b", text: "80°C" },
      { id: "c", text: "100°C" },
      { id: "d", text: "120°C" },
    ],
    correctAnswerId: "c",
    hint: "Nhiệt độ này bằng một trăm lần một độ C. Nhớ để trà nguội trước khi uống nhé!",
    enemyId: "tea-guard",
  },
  {
    id: "extra-day",
    floor: 3,
    question: "Một năm nhuận theo dương lịch có bao nhiêu ngày?",
    options: [
      { id: "a", text: "364 ngày" },
      { id: "b", text: "365 ngày" },
      { id: "c", text: "367 ngày" },
      { id: "d", text: "366 ngày" },
    ],
    correctAnswerId: "d",
    hint: "Năm nhuận có thêm ngày 29 tháng 2, tức là thêm một ngày so với 365 ngày.",
    enemyId: "calendar-guard",
  },
  {
    id: "big-ocean",
    floor: 4,
    question: "Đại dương nào có diện tích lớn nhất trên Trái Đất?",
    options: [
      { id: "a", text: "Thái Bình Dương" },
      { id: "b", text: "Đại Tây Dương" },
      { id: "c", text: "Ấn Độ Dương" },
      { id: "d", text: "Bắc Băng Dương" },
    ],
    correctAnswerId: "a",
    hint: "Đại dương này nằm giữa châu Á, châu Đại Dương và châu Mỹ. Tên của nó có nghĩa là yên bình.",
    enemyId: "sailor-guard",
  },
  {
    id: "green-magic",
    floor: 5,
    question:
      "Trong quá trình quang hợp, cây xanh hấp thụ khí nào từ không khí?",
    options: [
      { id: "a", text: "Oxy" },
      { id: "b", text: "Cacbon đioxit (CO₂)" },
      { id: "c", text: "Heli" },
      { id: "d", text: "Neon" },
    ],
    correctAnswerId: "b",
    hint: "Cây dùng nước, ánh sáng và khí có công thức CO₂ để tạo chất hữu cơ.",
    enemyId: "garden-guard",
  },
  {
    id: "honeycomb",
    floor: 6,
    question: "Một hình lục giác có bao nhiêu cạnh?",
    options: [
      { id: "a", text: "4 cạnh" },
      { id: "b", text: "5 cạnh" },
      { id: "c", text: "6 cạnh" },
      { id: "d", text: "8 cạnh" },
    ],
    correctAnswerId: "c",
    hint: "“Lục” trong từ Hán Việt nghĩa là sáu. Ô tổ ong thường có hình này đấy!",
    enemyId: "honey-guard",
  },
  {
    id: "poetry",
    floor: 7,
    question: "Ai là tác giả của tác phẩm Truyện Kiều?",
    options: [
      { id: "a", text: "Nguyễn Trãi" },
      { id: "b", text: "Hồ Xuân Hương" },
      { id: "c", text: "Nguyễn Đình Chiểu" },
      { id: "d", text: "Nguyễn Du" },
    ],
    correctAnswerId: "d",
    hint: "Đại thi hào này có tên gồm hai tiếng, tiếng cuối là “Du”.",
    enemyId: "poet-guard",
  },
  {
    id: "star-light",
    floor: 8,
    question: "Vận tốc ánh sáng trong chân không xấp xỉ bao nhiêu?",
    options: [
      { id: "a", text: "300.000 km/giây" },
      { id: "b", text: "300 km/giây" },
      { id: "c", text: "3.000 km/giây" },
      { id: "d", text: "30.000 km/giây" },
    ],
    correctAnswerId: "a",
    hint: "Ánh sáng đi được gần ba trăm nghìn kilômét chỉ trong một giây.",
    enemyId: "star-guard",
  },
  {
    id: "number-key",
    floor: 9,
    question: "Giá trị của 3² + 4² bằng bao nhiêu?",
    options: [
      { id: "a", text: "14" },
      { id: "b", text: "25" },
      { id: "c", text: "49" },
      { id: "d", text: "12" },
    ],
    correctAnswerId: "b",
    hint: "Bình phương là nhân một số với chính nó: 3 × 3 = 9 và 4 × 4 = 16. Cộng hai kết quả nhé!",
    enemyId: "number-guard",
  },
  {
    id: "final-promise",
    floor: 10,
    question: "Một tam giác có hai góc 50° và 60°. Góc còn lại bằng bao nhiêu?",
    options: [
      { id: "a", text: "50°" },
      { id: "b", text: "60°" },
      { id: "c", text: "70°" },
      { id: "d", text: "80°" },
    ],
    correctAnswerId: "c",
    hint: "Tổng ba góc trong một tam giác là 180°. Hãy lấy 180 trừ đi 50 và 60.",
    enemyId: "marshmallow-boss",
  },
];

// First encounter remains available to standalone visual previews.
export const previewQuestion = questions[0];
