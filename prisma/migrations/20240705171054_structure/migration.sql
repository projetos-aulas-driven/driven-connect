/*
  Warnings:

  - A unique constraint covering the columns `[fullname]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_fullname_key" ON "contacts"("fullname");
