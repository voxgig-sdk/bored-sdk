import { BoredEntityBase } from '../BoredEntityBase';
import type { BoredSDK } from '../BoredSDK';
import type { Control } from '../types';
import type { Activity, ActivityLoadMatch } from '../BoredTypes';
declare class ActivityEntity extends BoredEntityBase<Activity> {
    constructor(client: BoredSDK, entopts: any);
    make(this: ActivityEntity): ActivityEntity;
    load(this: any, reqmatch?: ActivityLoadMatch, ctrl?: Control): Promise<ActivityEntity>;
}
export { ActivityEntity };
