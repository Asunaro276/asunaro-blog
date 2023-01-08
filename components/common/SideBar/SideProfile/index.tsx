import { Card, CardContent, Divider, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Image from "next/image"

const SideProfile = () => {
  return (
    <Box className="h-full justify-end">
      <Card className="h-full">
        <CardContent className="">
          <Typography className="my-5 text-center">
            profile
          </Typography>
          <Box className="flex justify-center my-2">
            <Image src="/asunaro.jpg" alt="asunaro.jpg" width="150" height="150" className="rounded-full object-center" />
          </Box>
            <Typography className="text-center">
              あすなろ
            </Typography>
            <Box className="flex justify-center">
              <Divider className="w-20" />
            </Box>
            <Typography className="my-10 px-10">
              都内の大学生。2023年度からWeb広告企業に就職予定。Next.js, MUI中心に勉強中
            </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SideProfile
