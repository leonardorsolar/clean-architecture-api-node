import 'module-alias/register'
import app from "./config/app";

app.listen(5000, () => {
    console.log('Server runnin at http://localhost/5000')
})