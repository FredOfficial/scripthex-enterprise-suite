-- AlterTable
ALTER TABLE `employee` ADD COLUMN `workScheduleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `WorkSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `gracePeriod` INTEGER NOT NULL DEFAULT 0,
    `isNightShift` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WorkSchedule_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkScheduleBreak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workScheduleId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_workScheduleId_fkey` FOREIGN KEY (`workScheduleId`) REFERENCES `WorkSchedule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkScheduleBreak` ADD CONSTRAINT `WorkScheduleBreak_workScheduleId_fkey` FOREIGN KEY (`workScheduleId`) REFERENCES `WorkSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
