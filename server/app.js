const express = require("express")
const config = require("config")
const chalk = require("chalk")
const moongose = require("mongoose")
const initDatabase = require("./startUp/initDatabase")
const router = require("./routes")
const cors = require("cors")
const path = require("path")

// For delpoy on Heroku process.env.PORT
const PORT = config.get("port") ? config.get("port") : 8080
const app = express()

const corsOptions ={
	origin:"*",
	credentials:true,
	optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb" }))

app.use("/api", router) // Глобальный роут реагирует на это начало

//ВРЕМЕННО
app.use("/imagesGoods", express.static(path.join(__dirname, "imagesGoods")))

if (process.env.NODE_ENV === "production") {
	console.log(chalk.green.inverse("Production start mode"))
	const pathBaseStatic = path.join(__dirname, "client")
	app.use("/", express.static(pathBaseStatic))

	const staticHTML = path.join(pathBaseStatic, "index.html")
	app.get("*", (req, res) => {
		res.status(200).sendFile(staticHTML)
	})
} else {
	console.log(chalk.green.inverse("Development start mode"))
}

async function startWork() {
	try {
		moongose.connection.once("open", () => {
			initDatabase()
		})
		await moongose.connect(config.get("mongodbURL"))
		console.log(chalk.green.inverse("Mongodb has been started..."))
		app.listen(PORT, () => {
			console.log(chalk.green.inverse(`Server has been started on port: ${PORT}...`))
		})
	} catch (err) {
		console.log(err.message)
		console.log(chalk.red.inverse("Сервер не смог начать работу или БД. Попробуйте позже."))
		process.exit(1)
	}
}

startWork()

