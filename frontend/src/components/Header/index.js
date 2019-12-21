import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo-small.png';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="gympoint" />
          <span>GYMPOINT</span>
          <NavLink to="/students" activeStyle={{ color: '#444444' }}>
            ALUNOS
          </NavLink>
          <NavLink to="/plans" activeStyle={{ color: '#444444' }}>
            PLANOS
          </NavLink>
          <NavLink to="/enrollments" activeStyle={{ color: '#444444' }}>
            MATRÍCULAS
          </NavLink>
          <NavLink to="/help-orders" activeStyle={{ color: '#444444' }}>
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button id="logout" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
