import React from 'react'
import Topbar from "../layouts/Topbar"
import Footer from "../layouts/Footer"
import { Grid, Typography, Box, Card, CardMedia, ListItem, ListItemText, List } from '@mui/material';

function Home() {
  const data = {
    "1": "VIETTEL LÀ NGÔI NHÀ CHUNG",
    "2": "TRUYỀN THỐNG VÀ CÁCH LÀM CỦA NGƯỜI LÍNH",
    "3": "KẾT HỢP ĐÔNG TÂY",
    "4": "TƯ DUY HỆ THỐNG",
    "5": "SÁNG TẠO LÀ SỨC SỐNG",
    "6": "THÍCH ỨNG NHANH LÀ SỨC MẠNH CẠNH TRANH",
    "7": "TRƯỞNG THÀNH QUA THỬ THÁCH VÀ THẤT BẠI",
    "8": "THỰC TIỄN LÀ TIÊU CHUẨN KIỂM NGHIỆM CHÂN LÝ",
  };

  const data_1 ={
    "HÀNH ĐỘNG NHƯ NGƯỜI THỢ": "Là trực tiếp tạo ra sản phẩm trọn vẹn của riêng mình từ lựa chọn nguyên vật liệu đến khâu hoàn thiện ra thành phẩm cuối cùng, với sự tinh tế, đặc biệt, tỷ mỉ trong mọi công đoạn. Triết lý hành động đó đã và đang là kim chỉ nam định hướng hành động cho cán bộ, nhân viên của Tổng Công ty.",
    "TƯ DUY NHƯ HIỀN TRIẾT": "Là sự can đảm mãnh liệt để cán bộ, nhân viên có thể đưa ra tầm nhìn vượt trước hiện tại, thậm chí là kiến tạo tương lai, có phương pháp tiếp cận khoa học, khả năng tư duy đột phá để giải quyết vấn đề một cách nhanh hơn, chính xác hơn và hiệu quả hơn những cách thông thường của đại đa số mọi người vẫn làm."
  }

  const awards = [
    "Top 15 doanh nghiệp viễn thông phát triển nhanh nhất thế giới",
    "Xếp thứ 28 trên top 150 nhà mạng có giá trị nhất thế giới, với giá trị thương hiệu đạt 5,8 tỷ USD, đứng số 1 tại Đông Nam Á và thứ 9 tại Châu Á",
    "Chứng nhận “Best in Test” từ Công ty đo kiểm viễn thông hàng đầu thế giới Umlaut 2020",
    "Giải Bạc sản phẩm viễn thông mới xuất sắc nhất của giải thưởng Kinh doanh quốc tế 2020 cho gói data siêu tốc ST15K",
    "Nhà cung cấp dịch vụ của năm tại các thị trường đang phát triển năm 2009 và Nhà cung cấp dịch vụ data di động tốt nhất Việt Nam – 2019 (Frost & Sullivan)",
  ];

  return (
    <>
      <Topbar />
      <Box display="flex" justifyContent="center" mt={2}>
        <Card sx={{ maxWidth: "100%" }}>
          <CardMedia
            component="img"
            height="600"
            image="/Viettel.jpg"
            alt="Ảnh minh họa"
          />
        </Card>
      </Box>
      <Box display="flex" justifyContent="center" mt={1}>
        <Box p={4} maxWidth="800px" mx="auto" border={"1px solid black"} mr={1} borderRadius={'20px'}>
          <Box display="flex" justifyContent="center">
            <Typography variant='h4'
            fontWeight={'bold'}
            border={"1px solid black"}
            mb={2} borderRadius={'20px'}
            padding={2} >
              GIỚI THIỆU CHUNG
            </Typography>
          </Box>
          
          <Typography variant='h6' >Tập đoàn Công nghiệp – Viễn thông Quân đội, thường dược biết đến dưới tên giao dịch Viettel hay Tập đoàn Viettel, là một tập đoàn viễn thông và công nghệ Việt Nam được thành lập vào ngày 1 tháng 6 năm 1989.
          Các ngành nghề chính của tập đoàn bao gồm: ngành dịch vụ viễn thông & công nghệ thông tin; ngành nghiên cứu sản xuất thiết bị điện tử viễn thông, ngành công nghiệp quốc phòng, ngành công nghiệp an ninh mạng và ngành cung cấp dịch vụ số. Sản phẩm nổi bật nhất của Viettel hiện nay là mạng di động Viettel Mobile. Công ty thành viên Viettel Telecom của Viettel hiện đang là nhà mạng giữ thị phần lớn nhất trên thị trường dịch vụ viễn thông Việt Nam. Bên cạnh lĩnh vực viễn thông nổi tiếng, Viettel đang trở thành một nhà thầu quốc phòng quan trọng của Việt Nam với sự tham gia của các công ty con đáng chú ý như Viettel High Tech và Viện Hàng không Vũ trụ Viettel trong việc phát triển, sản xuất và cung cấp cho Quân đội Nhân dân Việt Nam nhiều sản phẩm và vũ khí nội địa như thiết bị liên lạc quân sự, máy bay không người lái, radar giám sát và tên lửa chống hạm.
        </Typography>
        </Box>
        <Box p={4} maxWidth="1000px" mx="auto" border={"1px solid black"} mr={1} borderRadius={'20px'}>
        <Box display="flex" justifyContent="center">
          <Typography variant='h4'
            fontWeight={'bold'}
            border={"1px solid black"}
            mb={2} borderRadius={'20px'}
            padding={2}
          >
            Danh hiệu - Giải thưởng quốc tế
          </Typography>
        </Box>
          <List>
            {awards.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText primary={`• ${item}`}  primaryTypographyProps={{ variant: 'h6'}}/>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt={2}  border={"1px solid black"} borderRadius={'20px'}>
        <Typography variant="h4" color='error' fontWeight="bold" ml={"14px"} mr={"14px"}>TRIẾT LÝ VĂN HÓA</Typography>
        <Grid container spacing={4} p={4}>
          {Object.entries(data).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={6} key={key}>
              <Box
                display="flex"
                alignItems={"center"}
                gap={2}
                height="100px"
                width="300px"
              >
                <Typography
                  variant="h3"
                  color="grey.300"
                  fontWeight="bold"
                  minWidth="30px"
                >
                  {key}
                </Typography>
                <Box display="flex" alignItems={key === "3" || key === "4" || key === "5" ? "center" : null}>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    fontWeight="bold"
                  >
                    {value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box display="flex"
      alignItems="center"
      justifyContent="center"
      border={"1px solid black"}
      borderRadius={'20px'}
      mt={2}
      mb={2}
      >
        <Typography variant="h3" color='error' fontWeight="bold" ml={"30px"} mr={"10px"}>TRIẾT LÝ HÀNH ĐỘNG</Typography>
        <Grid container spacing={12} p={12}>
          {Object.entries(data_1).map(([key, value]) => (
            <Grid>
              <Typography variant="h5"
                          color="textPrimary"
                          fontWeight="bold"> {key}</Typography>
              <Typography variant="h6"> {value}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default Home;