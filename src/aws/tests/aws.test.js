import { authenticateUser, logoutUser, registerUser } from "../aws.js";

describe("try login", () => {
    it("should return a code 200 when given valid credentials", async () => {
        const response = await authenticateUser(
            "testmail@gmail.com",
            "Password123#"
        );

        expect(response.status).toBe(200);
    });
});

describe("try logout", () => {
    it("should return a code 200", async () => {
        const response = await logoutUser();
        expect(response.status).toBe(200);
    });
});

describe("try register", () => {
    it("should return a code 400 if not all info is provided", async () => {
        const { response } = await registerUser(
            "testmail@gmail.com",
            "Password123#"
        );

        expect(response.status).toBe(400);
    });

    it("should return a code 400 if both passwords are not equal", async () => {
        const { response } = await registerUser(
            "testmail@gmail.com",
            "Password123#",
            "NotPassword123#"
        );

        expect(response.status).toBe(400);
    });

    it("should not return a 404 code when trying to register", async () => {
        const { response } = await registerUser(
            "testmail@gmail.com",
            "Password123#",
            "Password123#"
        );

        expect(response.status).not.toBe(404);
    });
});
