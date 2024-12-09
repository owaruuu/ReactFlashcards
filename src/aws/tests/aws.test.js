import { authenticateUser } from "../aws.js";

describe("try login", () => {
    it("should return a code 200 when given valid credentials", async () => {
        const response = await authenticateUser(
            "testmail@gmail.com",
            "Password123#"
        );

        expect(response.status).toBe(200);
    });
});
