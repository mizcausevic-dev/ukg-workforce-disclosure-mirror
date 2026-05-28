// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  disclosureGaps,
  reviewPosture,
  summary,
  workforceLane
} from "../src/services/ukgWorkforceDisclosureMirrorService.js";

console.log("ukg-workforce-disclosure-mirror demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(`workforce lanes: ${workforceLane().length}`);
console.log(`disclosure gap findings: ${disclosureGaps().length}`);
console.log(`review packets: ${reviewPosture().length}`);
