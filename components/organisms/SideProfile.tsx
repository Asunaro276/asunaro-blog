import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material"
import Box from "@mui/material/Box"

type Props = {}

const SideProfile = (props: Props) => {
  return (
    <Box className="justify-end">
      <Card sx={{ width: {
        md:300
      }, display: {
        xs:"none", md:"block"
      }
      }} className="">
        <CardContent className="">
          <Typography className="my-5 text-center">
            profile
          </Typography>
          <Box className="flex justify-center">
            <Avatar src="/asunaro.jpg" className="w-32 h-32 object-center my-3" />
          </Box>
            <Typography className="text-center">
              あすなろ
            </Typography>
            <Box className="flex justify-center">
              <Divider className="w-20" />
            </Box>
            <Typography className="my-10 px-10">
              都内の大学生。web開発を中心にプログラミングの情報を発信
            </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SideProfile
