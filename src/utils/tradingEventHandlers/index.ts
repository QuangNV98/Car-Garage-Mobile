
export default (io: any) => {
  console.log(io, "io")
  try {
    console.log("dah")
    io.on('connect', () => {
      // logger.info(`Socket Trading Connection Success: ${io.id}`);
      console.log("success")
      /** kết nối với hệ thống trading để lấy giá trị trả về theo từng giây */
      io.on('commit', async (data: any) => {
        /** lọc ra nến kết quả */
        console.log(data)
      });
    });

    io.on('connect_error', (error: any) => {
      console.log(`Socket Trading Connect Error: ${error.message}\n`);
    });

    io.on('error', (error: any) => {
      console.log(`Socket Trading Error: ${error.message}\n`);
    });

    io.on('disconnect', (reason: string) => {
      console.log(`Socket Trading Disconnected: ${reason}\n`);
    });
  } catch (error) {
    console.log(`SOCKET TRADING ERROR: ${error.message}\n`);
  }
};
