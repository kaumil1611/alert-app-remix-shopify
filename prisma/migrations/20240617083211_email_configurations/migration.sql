-- CreateTable
CREATE TABLE "EmailConfiguration" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "threshold" INTEGER NOT NULL DEFAULT 4,
    "frequency" INTEGER NOT NULL DEFAULT 5,
    "frequencyUnit" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfiguration_shop_key" ON "EmailConfiguration"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "EmailConfiguration_email_key" ON "EmailConfiguration"("email");
