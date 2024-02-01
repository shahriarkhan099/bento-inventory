"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const models_1 = __importDefault(require("./models"));
const ingredient_router_1 = __importDefault(require("./routers/ingredient.router"));
const ingredientBatch_router_1 = __importDefault(require("./routers/ingredientBatch.router"));
const category_router_1 = __importDefault(require("./routers/category.router"));
const order_router_1 = __importDefault(require("./routers/order.router"));
const supplier_router_1 = __importDefault(require("./routers/supplier.router"));
const wasteLog_router_1 = __importDefault(require("./routers/wasteLog.router"));
const consumptionLog_router_1 = __importDefault(require("./routers/consumptionLog.router"));
const deliveryBox_router_1 = __importDefault(require("./routers/deliveryBox.router"));
const deliveryBoxBatch_router_1 = __importDefault(require("./routers/deliveryBoxBatch.router"));
const vendorSide_router_1 = __importDefault(require("./routers/vendorSide.router"));
const autoPilot_router_1 = __importDefault(require("./routers/autoPilot.router"));
const node_cron_1 = __importDefault(require("node-cron"));
const expiryCheck_util_1 = __importDefault(require("./utils/expiryCheck.util"));
const autoPilotChecker_1 = __importDefault(require("./utils/autoPilotChecker"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    exposedHeaders: ["Authorization"],
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/v1/ingredient", ingredient_router_1.default);
app.use("/v1/ingredientBatch", ingredientBatch_router_1.default);
app.use("/v1/category", category_router_1.default);
app.use("/v1/order", order_router_1.default);
app.use("/v1/supplier", supplier_router_1.default);
app.use("/v1/wasteLog", wasteLog_router_1.default);
app.use("/v1/consumptionLog", consumptionLog_router_1.default);
app.use("/v1/deliveryBox", deliveryBox_router_1.default);
app.use("/v1/deliveryBoxBatch", deliveryBoxBatch_router_1.default);
app.use("/v1/vendorSide", vendorSide_router_1.default);
app.use("/v1/autoPilot", autoPilot_router_1.default);
app.use("/auth", auth_router_1.default);
node_cron_1.default.schedule("0 0 * * *", expiryCheck_util_1.default);
// cron.schedule("*/60 * * * * *", async () => {
node_cron_1.default.schedule("0 9 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Running auto-pilot check at 9 AM");
    try {
        yield (0, autoPilotChecker_1.default)();
        console.log("Auto-pilot completed");
    }
    catch (error) {
        console.error("Error in auto-pilot:", error);
    }
}));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield models_1.default.sync();
            app.listen(config_1.default.PORT, () => {
                console.log(`[server]: Server is running on port ${config_1.default.PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
bootstrap();
