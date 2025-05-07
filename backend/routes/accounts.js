import express from "express";

const router = express.Router();



router.route("/:userId").get(getAllAccountsForUser);

// GET specific bank or momo account
router.route("/bank/:accountId").get(getBankAccountById);
router.route("/momo/:accountId").get(getMomoAccountById);

// POST new bank or momo account
router.route("/bank").post(createBankAccount);
router.route("/momo").post(createMomoAccount);

// PATCH update bank or momo account
router.route("/bank/:accountId").patch(updateBankAccount);
router.route("/momo/:accountId").patch(updateMomoAccount);

// PATCH set default account
router.route("/bank/:accountId/default").patch(setDefaultBankAccount);
router.route("/momo/:accountId/default").patch(setDefaultMomoAccount);

// DELETE bank or momo account
router.route("/bank/:accountId").delete("/bank/:accountId", deleteBankAccount);
router.route("/momo/:accountId").delete(deleteMomoAccount);