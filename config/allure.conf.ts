import { execSync } from 'child_process';
import { ALLURE_REPORT_PATH, ALLURE_RESULTS_PATH } from '../helpers/env';


export const config = {
    generate: (): void => {

        const command = `allure generate ${ALLURE_RESULTS_PATH} --clean -o ${ALLURE_REPORT_PATH}`;
        console.log('🚀 Generating Allure Report...');

        try {
            execSync(command, { stdio: 'inherit' });
        } catch (error) {
            console.error('❌ Failed to generate Allure Report');
            process.exit(1);
        }
    },
    open: (): void => {

        const command = `allure open ${ALLURE_REPORT_PATH}`;
        console.log('🚀 Opening Allure Report...');

        try {
            execSync(command, { stdio: 'inherit' });
        } catch (error) {
            console.error('❌ Failed to open Allure Report');
            process.exit(1);
        }
    }
}
