<?php
namespace Jihe\Contracts\Repositories;

use Jihe\Entities\WechatUser as WechatUserEntity;

interface WechatUserRepository
{
    /**
     * Find user by openid
     *
     * @param string $openid
     *
     * @return \Jihe\Entities\WechatUser|null
     */
    public function findOne($openid);

    /**
     * save user
     *
     * @param array $user
     *
     * @return \Jihe\Entities\WechatUser|null
     */
    public function saveUser(array $user);
}
